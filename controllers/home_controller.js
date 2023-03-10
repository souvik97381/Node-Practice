// module.exports.home = function (req, res) {

//     console.log(req.cookies); // printing cookies in console
//     res.cookie("user_id", 25); // settitng up cookies

//     // return res.end('<h1>Express is up for Codeial!</h1>')

//     return res.render("home", { title: "Home" }); // render() is used for rendering ejs file
// }

// // module.exports.actionName = function(req, res){}







// const Post = require('../models/post');
// const User = require('../models/user');

// module.exports.home = function (req, res) {
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);

//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts:  posts
//     //     });
//     // });

//     // populate the user of each post
//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         })
//         .exec(function (err, posts) {

//             User.find({}, function (err, users) {
//                 return res.render('home', {
//                     title: "Codeial | Home",
//                     posts: posts,
//                     all_users: users
//                 });
//             });


//         })

// }

// module.exports.actionName = function(req, res){}



const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function (req, res) {

    try {
        // populate the user of each post
        let posts = await Post.find({})
            .sort("-createdAt")
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }

}