const Home = require('../models/home');
const Favourites = require('../models/favourite_home');


exports.getIndex = (req,res,next) => {
    Home.find().then(registerdHouse => {
           res.render('store/home-list',{
           registerdHouse: registerdHouse,
           pageTitle: 'airbnb Home',
           currentPage: 'Home'
       })
   });
}

    exports.getHomes = (req,res,next) => {
         Home.find().then(registerdHouse => {
                res.render('store/home-list',{
                registerdHouse: registerdHouse,
                pageTitle: 'airbnb Home',
                currentPage: 'Home'
            })
        });
    }

    exports.bookings = (req,res,next) => {
            res.render('store/bookings',{
                pageTitle: 'My bookings',
                currentPage: 'bookings'});
    }

    exports.getFavourites = (req,res,next) => {
    Favourites.find().then(favourite => {
        favourite = favourite.map(fav=>fav.houseId.toString());
        Home.find().then(registerdHouse => {
            console.log(favourite,registerdHouse);
            const favouriteHome = registerdHouse.filter((home) => 
                favourite.includes(home._id.toString()));
            res.render('store/favourite_list',{
                favouriteHome: favouriteHome,
                pageTitle: 'My Favourites',
                currentPage: 'favourites'
            });
        });
    });
}

exports.addToFavourite = (req,res,next) => {
    const id = req.body.id;             //request is post type that's why req.body.id is used to get id
    console.log("Came to add to favourite",req.body);

    Favourites.findOne({houseId:id}).then((fav) => {
        if(fav) {
            console.log("Already exist in favourites.");
            res.redirect('/favourites');
        } else {
            const fav = new Favourites({houseId:id});
            fav.save().then(result => {
                console.log("Added to favourites: ",result);
                res.redirect('/favourites');
            }).catch(err => {
                console.log("Error while adding to the favourites: ",err);
                res.redirect('/favourites');
            });
        }
    });
}

exports.getHomeList = (req,res,next) => {
    Home.find().then(registerdHouse => {
        console.log(registerdHouse);
        res.render('store/home-list',{registerdHouse: registerdHouse,
            pageTitle: 'Home List',
            currentPage: 'Home'});
    });
}

exports.getHomeDetails = (req,res,next) => {
    const homeId = req.params.homeId;               //request is get type that's why req.params.homeI d is used to get id
    console.log("At the home details page: ",homeId);

    Home.findById(homeId).then(home => {
        if(!home) {
            res.redirect('/homes')
        } else {
            console.log("Home found",home);
        res.render('store/home-detail',{
            home: home,
            pageTitle: "Home details",
            currentPage: "Home"
            });
        }
    });
}

exports.deleteHome = (req,res,next) => {
    const homeId = req.params.homeId;
    console.log("Trying to remove from favourite-list ",homeId);
    
    Favourites.findOneAndDelete({houseId:homeId}).then(result => {
        console.log("Deleted from fav: ",result);
    }).catch(err => {
        console.log("Error while removing from favourites: ",err);
    }).finally(() => {
        res.redirect('/favourites');
    })
}