import { MetadataRoute } from "next"
import { solutionsStaticParams } from "@/src/data"

export default function sitemap(): MetadataRoute.Sitemap {

    let sitemap = [
        {
            url: `https://msmtech.ca`,
            lastModified: new Date(),
        },
        {
            url: `https://msmtech.ca/contact`,
            lastModified: new Date(),
        },
    ]

    for(let solution of solutionsStaticParams) {
        sitemap.push({
            url: `https://msmtech.ca/solutions/${solution.handle}`,
            lastModified: new Date(),
        })
    }

    return sitemap
}