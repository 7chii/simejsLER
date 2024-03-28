app.get('/backend/public/cogconfig.png', (req, res)=>{
    res.set('content-type', 'image/png');
    res.sendFile(__dirname, 'public/images/cogconfig.png')
})