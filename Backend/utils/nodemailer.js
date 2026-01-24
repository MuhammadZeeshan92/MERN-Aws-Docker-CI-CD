import sgMail from '@sendgrid/mail';

   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

   const transporter = {
     sendMail: async (options) => {
       const msg = {
         to: options.to,
         from: options.from,
         replyTo: options.replyTo,
         subject: options.subject,
         html: options.html,
       };
       return await sgMail.send(msg);
     }
   };

   export default transporter;
