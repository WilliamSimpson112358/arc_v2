function links(parent, args, context) {
  return context.prisma.user({ id: parent.id }).links();
}

function airplanes(parent, args, context) {
  return context.prisma.user({ id: parent.id }).airplanes();
}

module.exports = {
  links,
  airplanes
};
