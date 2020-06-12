

new Vue({
    el: '#app',
    data: {
        stage: 0,
        lives: 4,
        score: 0,
        time: 0,
        color: 'blue',
        archery: [400, 200],     // x, y cordinates
        crosshair: [450, 250],     // x, y cordinates
        activity: 0,
        shootImg: 0,
        addPoint: false,
        points: 0,
        infoPanel: false,



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
                    this.stage++;
                    this.startingMusic.play();
                    this.time = 30;
                    let countDown = setInterval(()=>{
                        if(this.time == 1)
                        {
                            this.lives--;
                            clearInterval(countDown);
                        }
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
                    let distance = this.calDistance();
                    if(distance < 100)        // true when target is under range of archery
                    {
                        this.points = Math.round(100 - distance) + (this.time * 2)     // 1 second == 2 points
                        this.addPoint = true;
                        
                        setTimeout(()=>{
                            this.score += this.points;
                            this.addPoint = false;
                            this.points = 0;
                        }, 1000)
                    }
                    else                                // shoot outside the archery
                    {
                        console.log("Very bad");
                    }

                 break;
            }
            


        },
        calDistance: function()
        {
            let distance = [Math.abs(this.archery[0] - this.crosshair[0] + 50),         // +50 because archery image 200x200 and crosshair image 100x100
                            Math.abs(this.archery[1] - this.crosshair[1]  + 50)];

            actualDistance = Math.sqrt((distance[0] * distance[0]) + (distance[1] * distance[1]))       // Pythagoras Theory
            return actualDistance;            
        }
    }
});
document.querySelector('.commander').focus();