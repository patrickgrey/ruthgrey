const { AssetCache } = require("@11ty/eleventy-cache-assets");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinaryFolderName = "ruth-portfolio";

async function getImages() {
  const imageResult = cloudinary.api.resources(
    {
      type: "upload",
      resource_type: "image",
      prefix: "ruth-portfolio/",
      context: true,
      metadata: true,
    },
    function (error, result) {
      // console.error(result);
      const resources = result.resources;
      // resources.forEach((image) => {
      //   if (image.context) {
      //     console.error(image.context);
      //   }
      // });
      if (error) return error;
      return result;
    }
  );

  return imageResult;
}

module.exports = async function () {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Unique cache key required.
  let asset = new AssetCache("ruth-portfolio");

  // check if the cache is fresh within the last day
  if (asset.isCacheValid("1d")) {
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
  } catch (error) {
    // Fail gracefully
    console.error(error);
    console.log("Failed in call to Cloudinary, returning empty result.");
    return { total_count: 0, resources: [] };
  }

  // EXAMPLE RETURN DATA

  // {
  //   resources: [
  //     {
  //       asset_id: '188d17946e10728f606043614329677c',
  //       public_id: 'ruth-portfolio/bike',
  //       format: 'jpg',
  //       version: 1614347762,
  //       resource_type: 'image',
  //       type: 'upload',
  //       created_at: '2021-02-26T13:56:02Z',
  //       bytes: 475687,
  //       width: 2000,
  //       height: 1333,
  //       url: 'http://res.cloudinary.com/dwhxvo4kw/image/upload/v1614347762/ruth-portfolio/bike.jpg',
  //       secure_url: 'https://res.cloudinary.com/dwhxvo4kw/image/upload/v1614347762/ruth-portfolio/bike.jpg',
  //       context: {
  //         custom: {
  //           alt: 'A girls skipping on a mound in wasteland',
  //           caption: 'Girl skipping'
  //         }
  //       }
  //     },
  //     {
  //       asset_id: '9b8775c7f02321189a8c4fff8fac3d44',
  //       public_id: 'ruth-portfolio/girl-urban-view',
  //       format: 'jpg',
  //       version: 1614347760,
  //       resource_type: 'image',
  //       type: 'upload',
  //       created_at: '2021-02-26T13:56:00Z',
  //       bytes: 372778,
  //       width: 2048,
  //       height: 1252,
  //       url: 'http://res.cloudinary.com/dwhxvo4kw/image/upload/v1614347760/ruth-portfolio/girl-urban-view.jpg',
  //       secure_url: 'https://res.cloudinary.com/dwhxvo4kw/image/upload/v1614347760/ruth-portfolio/girl-urban-view.jpg',
  //       context: {
  //         custom: { alt: 'A smiling girl next to a bike.', caption: 'Girl by bike' }
  //       }
  //     }
  //   ],
  //   next_cursor: '65928d1ab1f6b7ce68041a20e452df2e4d7e7e604d3b28c53ff05824423ad463',
  //   rate_limit_allowed: 500,
  //   rate_limit_reset_at: 2021-03-03T23:00:00.000Z,
  //   rate_limit_remaining: 499
  // }
};
