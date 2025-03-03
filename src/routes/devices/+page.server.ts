import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
  const asc = url.searchParams.get("asc");
  const desc = url.searchParams.get("desc");

  const orderBy: Record<string, "asc" | "desc">[] = []
  if (asc) {
    const order: Record<string, "asc"> = {}
    order[asc] = "asc"
    orderBy.push(order)
  } else if (desc) {
    const order: Record<string, "desc"> = {}
    order[desc] = "desc"
    orderBy.push(order)
  }

  const devices = await prisma.device.findMany({
    omit: {
      secret: true
    },
    orderBy
  })

  return {
    devices
  }
}