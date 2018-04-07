function addUser(){
    
        var Name = sessionStorage.getItem('Name');
        $.ajax({
            type:'POST',
            url: 'http://www.rep-rant.com/hk18/addUser.php',
            data:{
                Name: Name
            },
            success: function(result){
                //alert("success");
				localStorage.setItem("userId", result);
				console.log("Added User with ID: " + result);
            },
            error:function(error) {
                console.log("Unable to Add User");
            }
        });
};

function getUser(){
    
        var Id = sessionStorage.getItem('userId');
        $.ajax({
            type:'POST',
            url: 'http://www.rep-rant.com/hk18/getUser.php',
            data:{
                Id: Id
            },
            success: function(result){
                //alert("success");
				console.log("Got User");
				localStorage.setItem("userProfile", result);
            },
            error:function(error) {
                console.log("Unable to Add User");
            }
        });
};