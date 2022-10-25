export const createEditChannels = async (
  _parent,
  { data: { workspaceId, channelsData } },
  context
) => {
  const { prisma, user } = context;

  await prisma.channel.deleteMany({
    where: {
      workspaceId,
    },
  });

  await prisma.channel.createMany({
    data: channelsData,
  });

  return true;
};

export const getChannels = async (_parent, { workspaceId }, context) => {
  const { prisma, user } = context;
  const channels = await prisma.workSpace.findMany({
    where: {
      userId: user.id,
      channels: {
        some: {
          workspaceId,
        },
      },
    },
  });
  return channels;
};
