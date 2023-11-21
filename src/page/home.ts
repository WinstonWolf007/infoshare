import express from 'express';
import path from 'path';


// HTML files
const publicPath: string = path.join(__dirname, '../../public/html');

export default function home(app: express.Express): void {
    app.get('/home', (req, res) => {
        res.sendFile(path.join(publicPath, 'home.html'));
    });
};