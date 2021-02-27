const {AssetCache} = require("@11ty/eleventy-cache-assets");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const cloudinaryFolderName = "ruth-portfolio";

async function getImages() {
  const imageResult = cloudinary.search
  .expression(`folder:${cloudinaryFolderName}`)
  .sort_by('uploaded_at','desc')
  .max_results(30)
  .execute().then(function(result, error){
    console.table(result);
    console.error(error);
    if (error) return error;
    return result;
  });

  return imageResult;
}

module.exports = async function() {

  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  // Unique cache key required.
  let asset = new AssetCache("ruth-portfolio");

  // check if the cache is fresh within the last day
  if(asset.isCacheValid("1d")) {
    // return cached data.
    console.log("********* Returning cached assets. ************");
    return asset.getCachedValue(); // a promise
  }

  try {
    let ruthImages = await getImages();
    console.log("Got images");
    // MUST CREATE .cache folder before running or will error.
    asset.save(ruthImages, "json");
    return ruthImages;
  } catch (err) {
    // Fail gracefully
    console.log("Failed in call to Cloudinary, returning empty result.");
    return {total_count: 0,resources: []}
  }

  // EXAMPLE RETURN DATA

  // {
  //   total_count: 1,
  //   time: 1274,
  //   resources: [
  //     {
  //       asset_id: 'a109a2c6baa2e02125ed2d791eb06f4e',
  //       public_id: 'ruth-portfolio/martin-reisch-199362-unsplash',
  //       folder: 'ruth-portfolio',
  //       filename: 'martin-reisch-199362-unsplash',
  //       format: 'jpg',
  //       version: 1519484000,
  //       resource_type: 'image',
  //       type: 'upload',
  //       created_at: '2018-02-24T14:53:20+00:00',
  //       uploaded_at: '2018-02-24T14:53:20+00:00',
  //       bytes: 3077171,
  //       backup_bytes: 0,
  //       width: 3651,
  //       height: 2737,
  //       aspect_ratio: 1.33394,
  //       pixels: 9992787,
  //       url: 'http://res.cloudinary.com/patrickgrey/image/upload/v1519484000/ruth-portfolio/martin-reisch-199362-unsplash.jpg',
  //       secure_url: 'https://res.cloudinary.com/patrickgrey/image/upload/v1519484000/ruth-portfolio/martin-reisch-199362-unsplash.jpg',
  //       status: 'active',
  //       access_mode: 'public',
  //       access_control: null,
  //       created_by: null,
  //       uploaded_by: null
  //     }
  //   ],
  //   rate_limit_allowed: 500,
  //   rate_limit_reset_at: 2021-02-23T22:00:00.000Z,
  //   rate_limit_remaining: 498
  // }
  
};