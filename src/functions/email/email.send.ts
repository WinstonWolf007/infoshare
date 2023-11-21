import nodemailer from 'nodemailer';
import * as auth from '../../security/nodemailer.auth.json'

export default function send_email(tocken: string, to: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: auth.user,
            pass: auth.pass,
        },  
    });
    
    const mailOptions = {
        from: auth.user,
        to: to,
        subject: 'Réinitialisation du mot de passe',
        html: `<p>Bonjour!</p><br><p>Votre code pour pouvoir réinitialiser votre mot de passe est celui-ci:</p><h2 style='font-family: monospace;'>${tocken}</h2><br><h3 style='color: red;'>IMPORTANT: Ne pas le partager!</h3>`
    };
    
    transporter.sendMail(mailOptions, (error: any) => {
        if (error) {
            console.error('Error: ', error);
        }
    });
}
