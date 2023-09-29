export const CLIENT_GALLERY_STATUS_TEXT = {
  draft: "Gallery is not open for client view.",
  clientreview:
    "Client should be reviewing photos and preparing ratings and potential revision requests.",
  revisions:
    "Photographer is currently working through revision requests, which will not be reflected in the gallery below.",
  revisionsreview:
    "Client should be reviewing revisions and prepping final approvals.",
  final:
    "All reviews, edits, and revisions are complete and the final deliverables are available.",
}

export const transition = { duration: 0.6 }
export const initialLeft = { opacity: 0, x: -50 }
export const whileInViewLeft = { opacity: 1, x: 0, transition }
export const initialRight = { opacity: 0, x: 50 }
export const whileInViewRight = { opacity: 1, x: 0, transition }
export const initialCenter = { opacity: 0, y: 50 }
export const whileInViewCenter = { opacity: 1, y: 0, transition }

export const wiggleInitial = { rotate: 0 }
const wiggleRotation = 4
export const wiggleAnimation = {
  rotate: [
    0,
    -wiggleRotation,
    0,
    wiggleRotation,
    0,
    -wiggleRotation,
    0,
    wiggleRotation,
    0,
    -wiggleRotation,
    0,
    wiggleRotation,
    0,
  ],
}
export const wiggleTransition = {
  duration: 0.5,
  repeat: 10,
  delay: 4,
  repeatDelay: 6,
}
