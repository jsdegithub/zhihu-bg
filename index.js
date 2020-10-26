const Koa=require('koa');
const app=new Koa();

app.use((ctx, next)=>{
    console.log(111);
    next();
    console.log('222');
    ctx.body='Hello JinShuo.';
});
app.use((ctx, next)=>{
    console.log(333);
    next();
    console.log('444');
});
app.use((ctx, next)=>{
    console.log('555');
});

app.listen(3000);

