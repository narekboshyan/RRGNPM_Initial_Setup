export const createWorkspace = async (
  _parent,
  { data: { name, slag } },
  context
) => {
  try {
    const { prisma, user } = context;

    await prisma.workSpace.create({
      data: {
        userId: user.id,
        name,
        subDomain: slag,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getWorkSpaces = async (_parent, { id }, context) => {
  try {
    const { prisma, user } = context;
    const workSpaces = await prisma.workSpace.findMany({
      where: {
        userId: user.id,
        id,
      },
    });

    return workSpaces;
  } catch (error) {
    console.log(error);
    return error;
  }
};
