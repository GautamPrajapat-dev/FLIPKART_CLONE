import nodemailer from 'nodemailer'

const sendMail = async (to, subject, text) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAILLER_HOST,
        port: process.env.MAILLER_PORT,
        auth: {
            user: process.env.MAILLER_USER,
            pass: process.env.MAILLER_PASS
        }
    })
    await transport.sendMail({
        to,
        subject,
        text
        // html: "<p>HTML version of the message</p>",
    })
}

export default sendMail
