// Need to work on Permissions
export const createEditWorkspace = async (
  _parent,
  { data: { name, subDomain, id } },
  context
) => {
  try {
    const { prisma, user } = context;

    const existingWorkspace = await prisma.workspace.findUnique({
      where: {
        subDomain,
      },
    });

    if (existingWorkspace) {
      throw new Error("Subdomain with this name already exists");
    }

    if (id) {
      await prisma.workspace.update({
        where: {
          id,
        },
        data: {
          name,
          subDomain,
        },
      });
    } else {
      const createdWorkspace = await prisma.workspace.create({
        data: {
          name,
          subDomain,
        },
      });

      const createdWorkspaceWithUser = await prisma.userOnWorkSpace.create({
        data: {
          userId: user.id,
          workspaceId: createdWorkspace.id,
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
    const workSpaces = await prisma.workspace.findMany({
      where: {
        users: {
          some: {
            userId: user.id,
          },
        },
        id,
      },
      include: {
        channels: true,
      },
    });

    console.log(workSpaces, "workSpaces");

    return workSpaces;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Need to work on Permissions
export const deleteWorkSpace = async (_parent, { id }, context) => {
  const { prisma, user } = context;
  await prisma.workspace.delete({
    where: {
      id,
    },
  });

  return true;
};
