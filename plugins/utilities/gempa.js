exports.run = {
   usage: ['gempa'],
   category: 'utilities',
   async: async (m, {
      client
   }) => {
      try {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.gempa()
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let caption = `乂  *G E M P A*\n\n`
         caption += `	◦  *Lintang* : ${json.data.lintang}\n`
         caption += `	◦  *Bujur* : ${json.data.bujur}\n`
         caption += `	◦  *Skala* : ${json.data.magnitudo}\n`
         caption += `	◦  *Kedalaman* : ${json.data.kedalaman}\n`
         caption += `	◦  *Waktu* : ${json.data.waktu}\n`
         caption += `	◦  *Pusat Gempa* : ${json.data.wilayah}\n\n`
         caption += global.footer
         client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.map)
         })
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}