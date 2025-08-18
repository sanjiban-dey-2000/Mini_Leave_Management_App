const nodemailer=require('nodemailer');

const sendEmail=async(to,subject,text,html)=>{
    try{
        //creating test account for dev
        const testAccount = await nodemailer.createTestAccount();

        const transporter=nodemailer.createTransport({
            //service:"gmail",
            host: "smtp.ethereal.email",
            port: 587,
            auth:{
                /*user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,*/

                //testing using ethereal test user
                user: testAccount.user, 
                pass: testAccount.pass,
            },
        });

        const info=await transporter.sendMail({
            from:`"Leave Management" <admin@example.com>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent successfully",transporter.messageId);
        console.log( nodemailer.getTestMessageUrl(info));
    }catch(error){
        console.log(error.message);
    }
}

module.exports=sendEmail;
