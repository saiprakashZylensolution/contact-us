const nodemailer = require("nodemailer");
const mailgen = require('mailgen');
const promisefs = require('fs').promises;
const path =  require('path')
const { fromEMAIL, toEMAIL, PASSWORD } = require('./env.js')

const getDetails = async (req, res) => {
    try {
        const clientData = await req.body;
        if (req.files.attachment[0].size <= 5000000) {
            const attachment = await req.files.attachment[0]
            promisefs.writeFile(attachment.originalname,attachment.buffer,(err)=>{
                console.log('filecreated')
                console.log(err)
            })
            if (clientData && attachment) {
                let info = {
                    service: 'gmail',
                    auth: {
                        user: fromEMAIL,
                        pass: PASSWORD
                    }
                }
                let transport = nodemailer.createTransport(info)
                let MailGenerator = new mailgen({
                    theme: 'salted',
                    product: {
                        name: "Zylen Solution",
                        link: 'https://www.zylensolutions.com/'
                    }
                })
                let response = {
                    body: {
                        name: 'Client Details',
                        table: {
                            data: [
                                {
                                    clientName: clientData.name,
                                    phone: clientData.phone,
                                    email: clientData.email,
                                    company: clientData.company,
                                    project_description: clientData.project_description,
                                    projectBudget: clientData.projectbudget
                                }
                            ]
                        }

                    }
                }
                let filepath = path.join(attachment.originalname)
                console.log(filepath)
                let mail = await MailGenerator.generate(response)
                let message = {
                    from: fromEMAIL,
                    to: toEMAIL,
                    subject: 'Details',
                    html: mail,
                    attachments: [{
                        filename: attachment.originalname,
                        path: filepath
                    }]
                }
                transport.sendMail(message).then(() => {
                    return res.status(200).send('please check the email')
                }).catch((error) => {
                    console.log(error)
                })
            }
        } else {
            return res.status(500).send('please upload the file under 5mb')
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send('no data')
    }

}

module.exports = {
    getDetails
}