import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const JWT_SECRET = process.env.JWT_SECRET;

// Generate a magic link for the given email
export const generateMagicLink = async (email) => {
    try {
        // Create a JWT token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15d" });

        // Save the token to the database
        // await MagicLinkModel.create({ email, token });
        //magic link created
        const magicLink = `http://localhost:${process.env.PORT}/magiclink/verify?token=${token}`;


        const emailData = {
            to: email, // Recipient's email address
            from: process.env.EMAIL_USER, // Your verified sender email
            subject: 'Your Verification Link',
            text: `Your verification link is : ${magicLink}`, // Plain text content
            html: `Click <a href="${magicLink}"> on the link</a> to verify your email.` // HTML content

        };

        sgMail
            .send(emailData)
            .then(() => {
                console.log('Email sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending email:', error.response.body.errors || error.message);
            });
        /*   const mailOptions = {
               from: process.env.EMAIL_USER, // Sender's email address
               to: email, // Recipient's email address
               subject: "Your Verification Link",
               text: `Your verification code is: ${magicLink}`,
           //    html: `Your verification code is: ${magicLink}` // HTML format for better UX
           };
           */
        return magicLink;
    } catch (error) {
        throw new Error("Sending mail failed.");
    }

};


import axios from 'axios'; // For geolocation API
import userAgent from 'express-useragent'; // For parsing user agent

// Get public IP address
const getPublicIP = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching public IP:', error);
        return null;
    }
};

// Get location based on IP address
const getLocationByIP = async (ipAddress) => {
    try {
        const geoResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json`)
        const location = geoResponse.data.city + ', ' + geoResponse.data.region + ', ' + geoResponse.data.country;
        return location;
    } catch (error) {
        console.error('Error fetching location:', error);
        return null;
    }
};


export const generateMagicLink2 = async (user, req) => {
    try {
         // Get public IP
         const ipAddress = await getPublicIP();

         // If IP is available, get the location
         let location = '';
         if (ipAddress) {
             location = await getLocationByIP(ipAddress);
         }
         // Create a JWT token
        const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
    
        // Capture user-agent (browser, OS, device type)
        const agent = userAgent.parse(req.headers['user-agent']);
        const deviceDetails = {
            browser: agent.browser,
            os: agent.os,
            platform: agent.platform,
        };


        const magicLink = `http://localhost:3000/login?token=${token}`;

        const emailData = {
            to: user.email, // Recipient's email address
            from: process.env.EMAIL_USER, // Your verified sender email
            subject: 'Your Login Request - Access Link',
            html: `
            <div style="font-family: 'Lato', 'Raleway', 'Titillium Web', Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');
                </style>
                <h2 style="color: #007BFF; text-align: center; font-family: 'Raleway', Arial, sans-serif;">Login Access - Fix Finder</h2>
                <p style="font-family: 'Lato', Arial, sans-serif;">Hi ${user.firstName || 'there'},</p>
                <p style="font-family: 'Titillium Web', Arial, sans-serif;">We received a login request to your Fix Finder account from a device with the following details:</p>
                <ul>
                    <li><strong>Browser:</strong> ${deviceDetails.browser}</li>
                    <li><strong>Operating System:</strong> ${deviceDetails.os}</li>
                    <li><strong>Platform:</strong> ${deviceDetails.platform}</li>
                    <li><strong>Location:</strong> ${location}</li>
                </ul>
                <p style="font-family: 'Titillium Web', Arial, sans-serif;">To continue, please click the button below to gain access:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${magicLink}" 
                       style="background-color: #007BFF; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 16px; font-family: 'Raleway', Arial, sans-serif;">
                        Access Your Account
                    </a>
                </div>
                <p style="font-family: 'Lato', Arial, sans-serif;">If you did not request this login, you can ignore this email. If you have concerns or need assistance, please <a href="mailto:support@fixfinder.com" style="color: #007BFF; text-decoration: none;">contact our support team</a>.</p>
                <p style="font-family: 'Titillium Web', Arial, sans-serif;">We’re happy to have you back on Fix Finder!</p>
                <p style="font-family: 'Raleway', Arial, sans-serif;">Best regards, <br><strong>Fix Finder Team</strong></p>
                <hr style="border-top: 1px solid #ddd;">
                <p style="font-family: 'Lato', Arial, sans-serif; font-size: 12px; color: #777; text-align: center;">
                    This is an autogenerated email. Please do not reply to this email.
                </p>
            </div>
            `
        };
        

        sgMail
            .send(emailData)
            .then(() => {
                console.log('Email sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending email:', error.response.body.errors || error.message);
            });
        return magicLink;
    } catch (error) {
        throw new Error("Sending mail failed.");

    }

};

// Verify the magic link
export const verifyMagicLink = async (token) => {
    const response = jwt.verify(token, JWT_SECRET);
    return response;
};
