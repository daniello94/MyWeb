const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

function resetPasswordToken(req, res) {
    try {
        const email = req.body.email;
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Wystąpił błąd podczas wyszukiwania użytkownika' });
            }
            if (!user) {
                return res.status(404).send({ error: 'Nie znaleziono użytkownika o podanym adresie email' });
            }

            const token = user.generateResetPasswordToken();
            user.tokenResetPassword = token;
            user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // expires in 24 hours
            user.save();

            // Send email with reset password link
            // ...
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.ADDRESS_EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const resetPasswordLink = `http://localhost:3000/reset-password/${token}`;

            const mailOptions = {
                from: process.env.ADDRESS_EMAIL,
                to: email,
                subject: "Resetowanie hsała",
                html: `<p>Otrzymałeś ten e-mail, ponieważ otrzymaliśmy prośbę o resetowanie hasła dla Twojego konta.</p>
                <p>Jeśli to nie Ty wysłałeś prośbę, możesz zignorować ten e-mail.</p>
                <p>Jeśli chcesz zresetować swoje hasło, kliknij
                <a href=${resetPasswordLink}>tutaj</a></p>
                <p>Link będzie ważny przez 24 godziny.</p>`
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email sent" + info.response);
                }
            })

            res.send({ success: true });
        });
    } catch (error) {
        res.status(500).send({ error: 'Wystąpił błąd podczas generowania tokenu resetującego hasło' });
    }
}

async function resetPassword(req, res) {
    try {
        // Pobierz token i hasło z body requesta
        const token = req.body.token;
        const password = req.body.password;

        // Użyj metody verify() do sprawdzenia tokenu
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: "Twoje uwierzytelnienie sie przedawniło" });
            }

            // Znajdź użytkownika o podanym ID
            const user = await User.findOne({ _id: decoded.userId });

            if (!user) {
                return res.status(404).send({ error: "Nie znaleziono użytkownika" });
            }

            // Sprawdź czy token jest aktualny i należy do tego użytkownika
            if (Date.now() > user.resetPasswordExpires) {
                return res
                    .status(401)
                    .send({ error: "Twoje uwierzytelnienie sie przedawniło lub token jest nieprawidłowy" });
            }
            if (token !== user.tokenResetPassword) {
                return res.status(401).send({ error: "Token jest nieprawidłowy" });
            }

            // Wygeneruj solę i zahashuj hasło
            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const hash = await bcrypt.hash(password, salt);

            // Zastąp dotychczasowe hasło nowym hashem
            await User.findByIdAndUpdate(
                { _id: decoded.userId },
                { password: hash },
                { new: true }
            );
            res.status(200).send("Hasło zostało zresetowane");
        });
    } catch (err) {
        return res.status(500).send({ error: "Wystąpił błąd podczas uwierzytalniania użytkownika" });
    }
}

function checkEmailUniqueness(email, cb) {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, { exists: Boolean(user) })
    })
};

function addUser(data, cb) {
    let newUser = new User(data);
    newUser.save(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function loginUser(data, cb) {
    User.findOne({ email: data.email }).exec(function (err, user) {
        if (err) {
            cb(err)
            return
        }
        if (!user) {
            cb(null, user)
            return
        };
        bcrypt.compare(data.password, user.password, function (err, logged) {
            if (err) {
                cb(err)
            } if (logged) {
                const token = user.generateAuthToken()
                cb(null, user, token)
            } else {
                cb(null, null)
            }
        })
    })
};

function delateUser(id, cb) {
    User.deleteOne({ _id: id }, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function listUser(cb) {
    User.find().lean().exec(function (err, users) {
        if (err) {
            cb(err)
        } else {
            cb(null, users)
        }
    })
};
function getUser(id, cb) {
    User.findById(id).exec(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

module.exports = {
    add: addUser,
    login: loginUser,
    delate: delateUser,
    email: checkEmailUniqueness,
    get: getUser,
    tokenReset: resetPasswordToken,
    reset: resetPassword,
    list: listUser
}