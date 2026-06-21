import AppKit
import PDFKit

if CommandLine.arguments.count < 3 {
  fputs("Usage: render-pdf-pages.swift input.pdf output-dir [scale]\n", stderr)
  exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
let scale = CommandLine.arguments.count >= 4 ? (Double(CommandLine.arguments[3]) ?? 2.0) : 2.0

try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

guard let document = PDFDocument(url: inputURL) else {
  fputs("Could not open PDF: \(inputURL.path)\n", stderr)
  exit(1)
}

for pageIndex in 0..<document.pageCount {
  guard let page = document.page(at: pageIndex) else { continue }

  let pageBounds = page.bounds(for: .mediaBox)
  let width = Int(pageBounds.width * scale)
  let height = Int(pageBounds.height * scale)
  let image = NSImage(size: NSSize(width: width, height: height))

  image.lockFocus()
  guard let context = NSGraphicsContext.current?.cgContext else {
    image.unlockFocus()
    fputs("Could not create graphics context for page \(pageIndex + 1)\n", stderr)
    exit(1)
  }

  NSColor.white.setFill()
  context.fill(CGRect(x: 0, y: 0, width: width, height: height))
  context.saveGState()
  context.scaleBy(x: CGFloat(scale), y: CGFloat(scale))
  page.draw(with: .mediaBox, to: context)
  context.restoreGState()
  image.unlockFocus()

  guard
    let tiffData = image.tiffRepresentation,
    let bitmap = NSBitmapImageRep(data: tiffData),
    let pngData = bitmap.representation(using: .png, properties: [:])
  else {
    fputs("Could not encode page \(pageIndex + 1)\n", stderr)
    exit(1)
  }

  let fileName = String(format: "page-%02d.png", pageIndex + 1)
  try pngData.write(to: outputURL.appendingPathComponent(fileName))
}

print(document.pageCount)
