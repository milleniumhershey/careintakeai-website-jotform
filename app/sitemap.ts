import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{const routes=["","/services","/audit","/book","/about","/resources","/privacy","/terms","/accessibility"];return routes.map(route=>({url:`https://careintakeai.com${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:.7}))}
