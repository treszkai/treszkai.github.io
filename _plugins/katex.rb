module Katex
  class << self

    # DISPLAY_REGEX = /\\\[(.+?)\\\]/m.freeze
    # DISPLAY_REGEX_2 = /\$\$(.+?)\$\$/m.freeze
    # INLINE_REGEX = /\\\((.+?)\\\)/m.freeze
    # INLINE_REGEX_2 = /\$([\S]+)\$/m.freeze
    INLINE_REGEX = /\$+([\S]+)\$+/m.freeze
        # ! this recognizes only ($$abc$)$

    # DISPLAY_OUTPUT = '<script type="math/tex; mode=display">\1</script>'
    INLINE_OUTPUT = '<script type="math/tex">\1</script>'

    def process(url, text)
      # puts "Processing " + url
      # puts "Content: " + text

      text.gsub(INLINE_REGEX, INLINE_OUTPUT)
    end
  end
end

pre_render_task = lambda { |doc, _|
  if doc.data['katex']
    doc.content = Katex.process(doc.url, doc.content)
  end
}

# Jekyll::Hooks.register(:posts, :pre_render, &pre_render_task)
# Jekyll::Hooks.register(:pages, :pre_render, &pre_render_task)
