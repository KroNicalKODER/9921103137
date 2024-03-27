import axios from 'axios';

export const login = async (req, res) => {
    try {
        const data = {
            "companyName": process.env.COMPANY_NAME,
            "clientID": process.env.CLIENT_ID,
            "clientSecret": process.env.CLIENT_SECRET,
            "ownerName": process.env.OWNER_NAME,
            "ownerEmail": process.env.OWNER_EMAIL,
            "rollNo": process.env.ROLL_NO
        };

        console.log(data);

        const response = await axios.post('http://20.244.56.144/test/auth', data);

        res.cookie("access_token", response.data.access_token, {
            httpOnly: true,
            maxAge: response.data.expires_in
        });

        res.json({ message: 'User login successful', data: response.data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
