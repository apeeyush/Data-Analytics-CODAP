# ===========================================================================
# Project:   DG
# Copyright: ©2010 KCP Technlogies, Inc.
# ===========================================================================

# Add initial buildfile information here
# SproutCore 1.5.pre.5 requires explicit ace reference.
# (cf. https://github.com/sproutit/sproutcore-abbot/issues#issue/35)
config :all, :required => [:sproutcore, 'sproutcore/ace', "sproutcore/experimental/split_view"], :theme => 'sproutcore/ace'
# config :all, :required => [:sproutcore]
# config :all, :serve_public => 1

# When building dg, use the 
config :dg,
        :title => "Data Games",
        :css_theme => 'ace.dg'

# Production build (e.g. sc-build, make deploy) configuration
mode :production do
  config :dg,
          :layout => 'dg:lib/index.rhtml'
end

# Debug build (e.g. sc-server) configuration
mode :debug do
  config :dg,
            :javascript_libs => [ # these urls will be inserted as the src of <script> tags in the <head> element
             ]
#          :layout => 'sproutcore:lib/index.rhtml',
end

# proxy for local dev.
proxy '/DataGames', :to => 'dg.ccssgames.com'

# # proxy for local dev with log-manager
# proxy '/DataGames', :to => 'localhost:3000'
# proxy '/api', :to => 'localhost:3000'
# proxy '/analytics', :to => 'localhost:3000'
