// /**
//  * The Post's schema encompasses all of the data related to any individual post,
//  * including its author, links to attached media, and an official report if one
//  * exists.
//  */

// import { Schema, SchemaTypes, Types, model } from 'mongoose';

// /**
//  * @typedef LocationData
//  * @property {number} lat - The latitude of the geographic location
//  * @property {number} lon - The longitude of the geographic location
//  */

// const Location = new Schema({
//   lat: Number,
//   lng: Number
// });

// /**
//  * @typedef {Map<string, mongoose.Types.ObjectId[]>} Endorsements - Maps Officer IDs to the list of User IDs that endorsed them
//  */

// /**
//  * @typedef PostData Information for user submitted posts
//  * @property {mongoose.Types.ObjectId} _id - MongoDB's internal unique ID
//  * @property {string} author      - The author's ID
//  * @property {string} title       - The post's title
//  * @property {string} content     - The post's description
//  * @property {LocationData} location    - The post's geographic location
//  * @property {string?} reportId   - The ID of this post's official report, if one exists
//  * @property {string[]} media     - A list of links to externally hosted media for this post
//  * @property {Endorsements} endorsements - A mapping of officer IDs to a list of user IDs that endorsed that officer
//  * @property {boolean} updated    - True if the post has been edited
//  * @property {Date} incidentTime  - The time of the incident
//  * @property {Date} postTime      - The time that the post was created
//  */

// const postsSchema = new Schema({
//   author: { type: SchemaTypes.ObjectId, required: true},          // The author's ID
//   title: { type: String, required: true},           // The post's title
//   content: { type: String, required: true },        // The post's description
//   location: Location,                               // The post's geographic location
//   reportId: { type: Types.ObjectId, default: null},         // The ID of this post's official report, if one exists
//   media: [String],                                  // A list of links to externally hosted media for this post
//   endorsements: { type: Map, default: () => new Map()}, // A mapping of officer IDs to a list of user IDs that endorsed that officer
//   updated: { type: Boolean, default: false },       // True if the post has been edited
//   incidentTime: { type: Date, default: Date.now },  // The time of the incident
//   postTime: { type: Date, default: Date.now }       // The time that the post was created
// });

// /**
//  * Returns a list of all posts that have an endorsed officer by this user ID
//  *
//  * @param {string} userId The MongoDB id of the user
//  * @returns {Promise<PostData[]>} A list of posts where the user with the ID was an endorser for any officer
//  */
// postsSchema.statics.endorsedBy = async function (userId) {
//   console.log("User ID", userId)
//   /** @type {PostData[]} Get the data for every post*/
//   const allPosts = await this.find({});

//   const endorsedPosts = allPosts.filter(postData => {
//     // Skip posts that don't have an endorsements parameter
//     if (!postData.endorsements) return false;
//     console.log(`Candidate Post: ${postData._id}`);
//     // Include the post only if the user has endorsed an officer in the post
//     for (let voters of postData.endorsements.values()) {
//       console.log(voters)
//       if (voters.some(id => id.equals(userId)) ) {
//         return true;
//       }
//     }
//     return false;
//   });

//   return endorsedPosts;
// }

// /**
//  * Removes the user's endorsement from all of the posts where it exists
//  * @param {string} userId The MongoDB ID for the user to purge from the database
//  * @returns {Promise<boolean[]>} A promise that resolves to a list of true values once endorsements have been purged
//  */
// postsSchema.statics.purgeEndorsements = async function (userId) {
//   /** @type {PostData[]} */
//   const endorsedPosts = await this.endorsedBy(userId);
//   /** @type {Promise<boolean>[]} */
//   const updates = [];

//   endorsedPosts.forEach(postData => {
//     // For each update operation, wrap it in a promise for parallelizaation

//     /** @type {Promise<boolean>} resolves to true once the post is successfully saved and updated */
//     const updateOperation = new Promise((resolve) => {
//       const post = await this.find({ _id: postData._id });
//       // Skip posts that have no endorsements
//       if (!post.endorsements) return resolve(true);
//       // Remove the user from a post's list of endorsers for each officerId
//       for (const [officerId, endorsers] of post.endorsements.entries()) {
//         if (!endorsers.includes(userId))
//           continue;
//         const purgedVoters = endorsers.filter(endorserId => endorserId !== userId);
//         post.endorsements.set(officerId, purgedVoters);
//         post.save().then(() => resolve(true));
//       }
//     });
//     updates.push(updateOperation);
//   });

//   return Promise.all(updates);
// }

// export default model('Posts', postsSchema);
