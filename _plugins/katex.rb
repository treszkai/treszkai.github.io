# require 'execjs'
#
# # Original source: https://gist.github.com/jackwillis/e4842a6d6fbc6ed438e813d2d2753eb8
#
# module Katex
#   class << self
#     JS_FILENAME = 'vendor/katex/katex.min.js'
#
#     JS_CTX = ::ExecJS.compile(File.read(JS_FILENAME))
#
#     INLINE_REGEX = /\\\((.*?)\\\)/m.freeze
#     INLINE_REGEX_2 = /\$([\S]+)\$/m.freeze
#     DISPLAY_REGEX = /\\\[(.*?)\\\]/m.freeze
#
#     def process(url, text, macros)
#       puts "Processing " + url
#
#       text
#         .gsub(INLINE_REGEX) { render_inline($1, macros) }
#         .gsub(INLINE_REGEX_2) { render_inline($1, macros) }
#         .gsub(DISPLAY_REGEX) { render_display($1, macros) }
#     end
#
#     def render_inline(text, macros)
#       JS_CTX.call('katex.renderToString', text, macros: macros)
#     end
#
#     def render_display(text, macros)
#       JS_CTX.call('katex.renderToString', text, macros: macros, displayMode: true)
#     end
#
#   end
# end
#
# pre_render_task = lambda { |doc, _|
#   if ! ( doc.data['katex_disabled'] || (doc.data['katex'] && doc.data['katex']['disabled'] ) )
#     doc.content = Katex.process(doc.url, doc.content, (doc.data['katex'] && doc.data['katex']['macros']) || [])
#   end
# }

# Jekyll::Hooks.register(:posts, :pre_render, &pre_render_task)
# Jekyll::Hooks.register(:pages, :pre_render, &pre_render_task)
