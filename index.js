const PORT = 5000
const Application = require('./framework/application');
const userRouter = require('./src/user_routers');
const jsonParther = require('./framework/parseJson');
const app = new Application();



app.use(jsonParther);
app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
