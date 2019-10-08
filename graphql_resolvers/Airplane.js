function userInPossession(parent, args, context) {
  return context.prisma.airplane({ id: parent.id }).userInPossession();
}

module.exports = {
  userInPossession
};
