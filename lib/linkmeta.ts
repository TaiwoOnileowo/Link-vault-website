import { LinkType } from "@/types";
import mql from "@microlink/mql";
export const getLinkMeta = async (links: LinkType[]) => {
  try {
    const linksWithMeta = await Promise.all(
      links.map(async (link: LinkType) => {
        const { url } = link;
        try {
          const { data } = await mql(url, { meta: true });
          return {
            ...link,
            image: data.image?.url || data.logo?.url || null,
            title: data.title || null,
            description: data.description || null,
          };
        } catch (error) {
          console.error(`Error processing ${url}:`, error);
          return { ...link, image: null, title: null, description: null };
        }
      })
    );
    return linksWithMeta;
  } catch (error) {
    console.error("Error processing the links:", error);
    return [];
  }
};
      // if (folderId && linkId) {
      //   // First instance: Add a single link to a folder and remove it from the main links array
      //   const updateResult = await usersCollection.updateOne(
      //     { _id: objectId, "folders.id": parseInt(folderId as string) },
      //     {
      //       $push: { "folders.$.links": { $each: [data], $position: 0 } },
      //       $pull: { links: { id: parseInt(linkId as string) } },
      //     }
      //   );

      //   if (updateResult.modifiedCount === 0) {
      //     return res.status(404).json({ error: "Folder or link not found" });
      //   }

      //   return res
      //     .status(200)
      //     .json({ message: "Link moved to folder successfully" });
      // }