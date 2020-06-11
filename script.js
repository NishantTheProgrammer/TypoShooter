

new Vue({
    el: '#app',
    data: {
        stage: 0,
        lives: 3,
        score: 230,
        time: 0,
        color: 'blue',
        archery: [400, 200],     // x, y cordinates
        crosshair: [450, 250],     // x, y cordinates
        activity: 0,
        shootImg: 0,



        //--------------------------------------Sounds--------------------------------------------------------

        slip: new Audio('./assets/sound/slip.mp3'),
        shoot: new Audio('./assets/sound/shoot.mp3'),
        startingMusic: new Audio('./assets/sound/starting.mp3')
    },
    methods: {
        commander: function(event)
        {
            const command = event.target.value.toLowerCase().split(" ");
            event.target.value = "";

            this.activity++;        //to fix issue of not updating style
            switch(command[0])
            {
                //----------------------------------------------------Start Command-----------------------------------------------------          
                case "start":
                    this.startingMusic.play();
                    this.time = 30;
                    setInterval(()=>{
                        this.time--;
                    }, 1000)
                    this.archery[0] = Math.floor((Math.random() * 800));            // 1000 - 200
                    this.archery[1] = Math.floor((Math.random() * 400));            // 600 - 200
                    
                    this.crosshair[0] = Math.floor((Math.random() * 900));            // 1000 - 200
                    this.crosshair[1] = Math.floor((Math.random() * 500));            // 600 - 200
                 break;


                //----------------------------------------------------Left Command------------------------------------------------------          
                case "left":
                    this.slip.play();
                    this.crosshair[0] -= Number(command[1]);

                 break;


                //----------------------------------------------------Right Command-----------------------------------------------------          
                case "right":
                    this.slip.play();
                    this.crosshair[0] += Number(command[1]);

                 break;


                //----------------------------------------------------Up Command--------------------------------------------------------         
                case "up":
                    this.slip.play();
                    this.crosshair[1] -= Number(command[1]);

                 break;


                //----------------------------------------------------Down Command-------------------------------------------------------           
                case "down":
                    this.slip.play();
                    this.crosshair[1] += Number(command[1]);

                 break;


                //----------------------------------------------------Shoot-------------------------------------------------------           
                case "shoot":
                    this.shootImg = 1;
                    this.shoot.play();

                 break;
            }
            


        }
    }
});
document.querySelector('.commander').focus();