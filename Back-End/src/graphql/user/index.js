import { sendEmail } from "../../services/Email.js";
import { generateRandomNumber } from "../../utils/helpers.js";

export const inviteUser = async (
  _parent,
  { invitedUserEmail, workspaceId },
  context
) => {
  try {
    const { prisma, user } = context;
    const invitationCode = generateRandomNumber(6);

    const existingUserWIthEmail = await prisma.user.findUnique({
      where: {
        email: invitedUserEmail,
      },
    });

    if (existingUserWIthEmail) {
      throw new Error("user with this email already exists");
    }

    const createdInvitedUser = await prisma.userOnWorkSpace.create({
      data: {
        user: {
          create: {
            email: invitedUserEmail,
            invitationCode,
          },
        },
      },
    });

    const setUserId = await prisma.userOnWorkSpace.update({
      where: {
        id: createdInvitedUser.id,
      },
      data: {
        workspaceId,
      },
    });

    const workspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    sendEmail(
      `${user.firstName} ${user.lastName}`,
      invitedUserEmail,
      invitationCode,
      workspace.name
    );

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
