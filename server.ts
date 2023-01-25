import express, {NextFunction, Request, Response} from 'express';
import { reqtoCurl, ExpressResponseType } from './index';
const app = express();
 const logRequest = (req: Request, res: Response, next: NextFunction) => {
     console.log(
            reqtoCurl({
                request: req,
                type: ExpressResponseType.RETURN,
            }),
        );

    next();
};

app.use(logRequest);
app.listen(9000, () => console.log(`Server running on port 8080`));