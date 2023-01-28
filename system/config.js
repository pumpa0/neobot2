// Owner number
global.owner = '6285731855426'
// Owner name
global.owner_name = 'Hans'
// Database name (Default: database)
global.database = 'database'
// Maximum upload file size limit (Default : 100 MB)
global.max_upload = 100
// Delay for spamming protection (Default : 3 seconds)
global.cooldown = 3
// User Limitation (Default : 25)
global.limit = 20
// Time to be temporarily banned and others (Default : 30 minutes)
global.timer = 1800000
// Symbols that are excluded when adding a prefix (Don't change it)
global.evaluate_chars = ['=>', '~>', '<', '>', '$']
// Country code that will be automatically blocked by the system, when sending messages in private chat
global.blocks = ['91', '92', '94', '94', '212']
// Put target jid to forward friends story
global.forwards = global.owner + '@c.us'
// Get neoxr apikey by registering at https://api.neoxr.my.id
global.Api = new (require('./neoxrApi'))('botzhanapi')
// Get bid and key configuration for autoreply chat ai feature by registering at https://brainshop.ai
global.chatai_bid = '168058'
global.chatai_key = '8uOEiYGNCTwAiE0k'
// Timezone (Default : Asia/Jakarta)
global.timezone = 'Asia/Jakarta'
// Bot version
global.version = '2.2.2',
// Bot name
global.botname = `© HanBotz`
// Footer text
global.footer = 'https://saweria.co/hanbotz'
// Global status
global.status = Object.freeze({
   wait: Function.texted('bold', 'Processed . . .'),
   invalid: Function.texted('bold', 'URL is Invalid!'),
   wrong: Function.texted('bold', 'Wrong format!'),
   getdata: Function.texted('bold', 'Scraping metadata . . .'),
   fail: Function.texted('bold', 'Can\'t get metadata!'),
   error: Function.texted('bold', 'Error occurred!'),
   errorF: Function.texted('bold', 'Sorry this feature is in error.'),
   premium: Function.texted('bold', 'This feature only for premium user.'),
   owner: Function.texted('bold', 'This command only for owner.'),
   god: Function.texted('bold', 'This command only for Master'),
   group: Function.texted('bold', 'This command will only work in groups.'),
   botAdmin: Function.texted('bold', 'This command will work when I become an admin.'),
   admin: Function.texted('bold', 'This command only for group admin.'),
   private: Function.texted('bold', 'Use this command in private chat.')
})
