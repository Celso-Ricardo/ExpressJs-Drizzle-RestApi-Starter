import express, {Express } from 'express'
import routes from './routers';

const port = process.env.PORT || 3000;



const app: Express = express();
app.use(express.json())

routes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})