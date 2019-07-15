
#
## Customize post location and post extensions
#

baseurl = `cat ./_config.yml | awk '/baseurl/ { print $2 }' | sed 's/\"//g'`

SOURCE = "."
CONFIG = {
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
  'theme_package_version' => "0.1.0"
}

#
## Color console outout support just because :D
#
module Colors
  def colorize(text, color_code)
    "\033[#{color_code}m#{text}\033[0m"
  end

  {
    :black    => 30,
    :red      => 31,
    :green    => 32,
    :yellow   => 33,
    :blue     => 34,
    :cyan     => 36,
  }.each do |key, color_code|
    define_method key do |text|
      colorize(text, color_code)
    end
  end
end
include Colors

#
## Just typing `rake` will invoke `rake preview`
#
task :default => :preview
load '_rake-configuration.rb' if File.exist?('_rake-configuration.rb')

desc 'Preview with livereload on local machine'
task :preview => :clean do
	puts green "Starting livereload server"
  jekyll('serve --incremental')
end
task :serve => :preview

desc 'Clean up generated site'
task :clean do
    cleanup
end

desc 'Check links for generated site'
task :check do
  STDOUT.sync = true
	cleanup
  jekyll("build -d _site#{baseurl}")
	puts cyan "Running html proofer..."
	puts `htmlproofer --assume-extension --alt-ignore '/.*/' ./_site`
end

desc "Generate production website"
task :prod do
  puts "\n## Generating for production"
  status = system("JEKYLL_ENV=production bundle exec jekyll build")
end

desc "Serve production website"
task :prodserve do
  puts "\n## Generating for production and serving"
  status = system("JEKYLL_ENV=production bundle exec jekyll serve")
end

desc "Build site and push"
task :push => :prod do
    sh 'cd _site; git commit -am "Update (see source branch for description)"; git push; cd ..'
end

#
## General support functions
#

def cleanup
  sh 'rm -rf _site/*'
end

def jekyll(directives = '')
  sh 'jekyll ' + directives
end

def rake_running
  `ps | grep 'rake' | grep -v 'grep' | wc -l`.to_i > 1
end
