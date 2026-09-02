const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(userEmail, userName) {
    const { data, error } = await resend.emails.send({
        from: `Chatter-ji <${process.env.EMAIL_FROM}>`,
        to: [userEmail],
        subject: "Welcome to Chatter-ji 🎉",

        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <body style="
            margin:0;
            padding:0;
            background:#f5f5f7;
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
        ">

            <div style="
                max-width:600px;
                margin:45px auto;
                background:#ffffff;
                border-radius:20px;
                overflow:hidden;
                border:1px solid #e8e8eb;
            ">

                <div style="
                    padding:34px 40px;
                    background:#111113;
                    text-align:center;
                ">
                    <div style="
                        display:inline-block;
                        padding:8px 14px;
                        border:1px solid #333338;
                        border-radius:30px;
                        color:#ffffff;
                        font-size:13px;
                        letter-spacing:1px;
                        margin-bottom:18px;
                    ">
                        CHATTER-JI
                    </div>

                    <h1 style="
                        margin:0;
                        color:#ffffff;
                        font-size:30px;
                        font-weight:600;
                    ">
                        Welcome aboard, ${userName}
                    </h1>
                </div>

                <div style="padding:42px 40px;">

                    <p style="
                        margin:0 0 18px;
                        color:#18181b;
                        font-size:18px;
                        line-height:1.6;
                    ">
                        Your account is officially ready.
                    </p>

                    <p style="
                        margin:0 0 30px;
                        color:#66666f;
                        font-size:15px;
                        line-height:1.7;
                    ">
                        Thanks for joining Chatter-ji. Your account has been
                        successfully created and you're all set to start
                        connecting and chatting.
                    </p>

                    <div style="
                        background:#f7f7f8;
                        border:1px solid #e8e8eb;
                        border-radius:14px;
                        padding:20px 22px;
                        margin-bottom:30px;
                    ">
                        <div style="
                            color:#9999a1;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                            margin-bottom:7px;
                        ">
                            Account
                        </div>

                        <div style="
                            color:#18181b;
                            font-size:15px;
                            font-weight:500;
                        ">
                            ${userEmail}
                        </div>
                    </div>

                    <p style="
                        margin:0;
                        color:#66666f;
                        font-size:14px;
                        line-height:1.7;
                    ">
                        Your Chatter-ji journey starts here.
                    </p>

                </div>

                <div style="
                    padding:24px 40px;
                    border-top:1px solid #eeeeef;
                    text-align:center;
                    background:#fafafa;
                ">
                    <p style="
                        margin:0 0 8px;
                        color:#9999a1;
                        font-size:12px;
                    ">
                        You're receiving this email because an account
                        was created using this address.
                    </p>

                    <p style="
                        margin:0;
                        color:#b0b0b7;
                        font-size:11px;
                    ">
                        © 2026 Chatter-ji
                    </p>
                </div>

            </div>

        </body>
        </html>
        `
    });

    if (error) {
        console.error("Email error:", error);
        return;
    }

    console.log("Welcome email sent:", data);
}

module.exports = { sendWelcomeEmail };