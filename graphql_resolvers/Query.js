function feed(parent, args, context, info) {
  return context.prisma.links();
}

function airplane_information(parent, args, context, info) {
  return context.prisma.airplanes();
}

module.exports = {
  feed,
  airplane_information
};
