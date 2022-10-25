// Need to work on Permissions
export const createEditWorkspace = async (
  _parent,
  { data: { name, subDomain, id } },
  context
) => {
  try {
    const { prisma, user } = context;

    if (id) {
      console.log("ID EXISTS");
      await prisma.workSpace.update({
        where: {
          id,
        },
        data: {
          name,
          subDomain,
        },
      });
    } else {
      console.log("ID DOES NOT EXISTS");

      await prisma.workSpace.create({
        data: {
          userId: user.id,
          name,
          subDomain,
        },
      });
    }

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
      include: {
        channels: true,
      },
    });

    return workSpaces;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Need to work on Permissions
export const deleteWorkSpace = async (_parent, { id }, context) => {
  const { prisma, user } = context;
  console.log(id);
  await prisma.workSpace.delete({
    where: {
      id,
    },
  });

  return true;
};
