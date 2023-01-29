const fs = require('fs')
exports.run = {
   usage: ['menu'],
   hidden: ['menutype'],
   async: async (m, {
      client,
      text,
      isPrefix
   }) => {
      try {
         client.menu = client.menu ? client.menu : {}
         const id = m.chat
         const local_size = fs.existsSync('./' + global.database + '.json') ? await Func.getSize(fs.statSync('./' + global.database + '.json').size) : ''
         const message = global.db.setting.msg.replace('+tag', `@${m.sender.replace(/@.+/g, '')}`).replace('+name', m.pushName).replace('+greeting', Func.greeting()).replace('+db', (process.env.DATABASE_URL ? 'Mongo' : `Local (${local_size})`)).replace('+version', JSON.parse(require('fs').readFileSync('./package.json', 'utf-8')).dependencies.bails)
         const style = global.db.setting.menuStyle
         if (style == 1) {
            if (text) {
               let cmd = Object.entries(client.plugins).filter(([_, v]) => v.run.usage && v.run.category == text.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Category not available.`), m)
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               const print = commands.sort((a, b) => a.usage.localeCompare(b.usage)).map(v => `◦  ${isPrefix + v.usage} ${v.use}`).join('\n')
               return m.reply(print)
            } else {
               let filter = Object.entries(client.plugins).filter(([_, obj]) => obj.run.usage)
               let cmd = Object.fromEntries(filter)
               let category = []
               for (let name in cmd) {
                  let obj = cmd[name].run
                  if (!cmd) continue
                  if (!obj.category) continue
                  if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
                  else {
                     category[obj.category] = []
                     category[obj.category].push(obj)
                  }
               }
               let rows = []
               const keys = Object.keys(category).sort()
               for (let k of keys) {
                  rows.push({
                     title: k.toUpperCase(),
                     rowId: `${isPrefix}menutype ${k}`,
                     description: ``
                  })
               }
               client.sendList(m.chat, '', message, global.botname, 'Tap!', [{
                  rows
               }], m)
            }
         } else if (style == 2) {
            if ((id in client.menu)) {
               await client.sendReact(m.chat, '😡', m.key)
               return client.reply(m.chat, `Hi @${m.sender.split`@`[0]} ^\nTo avoid spam, menu is displayed every *3 minutes*.`, client.menu[id][0])
            }
            let filter = Object.entries(client.plugins).filter(([_, obj]) => obj.run.usage)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n乂  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(client.plugins).filter(([_, v]) => v.run.usage && v.run.category == k.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map(v => `	◦  ${isPrefix + v.usage} ${v.use}`).join('\n')
            }
            client.menu[id] = [
               await client.sendMessageModify(m.chat, print + '\n', m, {
                  ads: false,
                  largeThumb: true,
                  url: global.db.setting.link
               }),
               setTimeout(() => {
                  delete client.menu[id]
               }, 180000)
            ]
         } else if (style == 3) {
            if (text) {
               let cmd = Object.entries(client.plugins).filter(([_, v]) => v.run.usage && v.run.category == text.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Category not available.`), m)
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               const print = commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
                  if (i == 0) {
                     return `┌  ◦  ${isPrefix + v.usage} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
                     return `└  ◦  ${isPrefix + v.usage} ${v.use}`
                  } else {
                     return `│  ◦  ${isPrefix + v.usage} ${v.use}`
                  }
               }).join('\n')
               return m.reply(print)
            } else {
               let filter = Object.entries(client.plugins).filter(([_, obj]) => obj.run.usage)
               let cmd = Object.fromEntries(filter)
               let category = []
               for (let name in cmd) {
                  let obj = cmd[name].run
                  if (!cmd) continue
                  if (!obj.category) continue
                  if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
                  else {
                     category[obj.category] = []
                     category[obj.category].push(obj)
                  }
               }
               let rows = []
               const keys = Object.keys(category).sort()
               for (let k of keys) {
                  rows.push({
                     title: k.toUpperCase(),
                     rowId: `${isPrefix}menutype ${k}`,
                     description: ``
                  })
               }
               client.sendList(m.chat, '', message, global.botname, 'Tap!', [{
                  rows
               }], m)
            }
         } else if (style == 4) {
            if ((id in client.menu)) {
               await client.sendReact(m.chat, '😡', m.key)
               return client.reply(m.chat, `Hi @${m.sender.split`@`[0]} ^\nTo avoid spam, menu is displayed every *3 minutes*.`, client.menu[id][0])
            }
            let filter = Object.entries(client.plugins).filter(([_, obj]) => obj.run.usage)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(client.plugins).filter(([_, v]) => v.run.usage && v.run.category == k.toLowerCase())
               let usage = Object.keys(Object.fromEntries(cmd))
               if (usage.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.usage.constructor.name) {
                     case 'Array':
                        v.run.usage.map(x => commands.push({
                           usage: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           usage: v.run.usage,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
                  if (i == 0) {
                     return `┌  ◦  ${isPrefix + v.usage} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
                     return `└  ◦  ${isPrefix + v.usage} ${v.use}`
                  } else {
                     return `│  ◦  ${isPrefix + v.usage} ${v.use}`
                  }
               }).join('\n')
            }
            client.menu[id] = [
               await client.sendMessageModify(m.chat, print + '\n', m, {
                  ads: false,
                  largeThumb: true,
                  url: global.db.setting.link
               }),
               setTimeout(() => {
                  delete client.menu[id]
               }, 180000)
            ]
         }
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
