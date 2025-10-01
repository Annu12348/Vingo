import imagekit from "imagekit";
import { config } from "../config/config.js";
import path from "path";

export const Imagekit = new imagekit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: config.IMAGEKIT_ENDPOINT_URL,
});

export const uploadImages = (file, originalName) => {
    const ext = path.extname(originalName)
    return new Promise((resolve, reject) => {
        Imagekit.upload({
            file: file,
            fileName: "images-file" + Date.now() + ext,
            folder: "images"
        }, (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}