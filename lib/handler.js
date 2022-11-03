require("../config")
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys")
const fs = require("fs")
const util = require("util")
const chalk = require("chalk")
const { exec, spawn, execSync } = require("child_process")
const { fromBuffer } = require("file-type")
const { performance } = require("perf_hooks")
const axios = require("axios")
const path = require("path")
const os = require("os")
const moment = require("moment-timezone")
const speed = require("performance-now")
const xfar = require("xfarr-api")
const { color } = require("../lib/color")
const { smsg, getGroupAdmins, formatp, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require("../lib/myfunc")

module.exports = client = async (client, m, chatUpdate, store) => {
  try {
    var body = (m.mtype === "conversation") ? m.message.conversation : (m.mtype == "imageMessage") ? m.message.imageMessage.caption : (m.mtype == "videoMessage") ? m.message.videoMessage.caption : (m.mtype == "extendedTextMessage") ? m.message.extendedTextMessage.text : (m.mtype == "buttonsResponseMessage") ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "templateButtonReplyMessage") ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === "messageContextInfo") ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
    var budy = (typeof m.text == "string" ? m.text : "")
    var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®â?+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®â?+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
    const isCmd = body.startsWith(prefix)
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const botNumber = await client.decodeJid(client.user.id)
    const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
    const itsMe = m.sender == botNumber ? true : false
    const text = q = args.join(" ")
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ""
    const isMedia = /image|video|sticker|audio/.test(mime)

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => { }) : ""
    const groupName = m.isGroup ? groupMetadata.subject : ""
    const participants = m.isGroup ? await groupMetadata.participants : ""
    const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
    const groupOwner = m.isGroup ? groupMetadata.owner : ""
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

    if (!client.public) {
      if (!m.key.fromMe) return
    }

    if (isCmd) {
      console.log(chalk.black(chalk.bgCyanBright("[ CMD ]")), chalk.black(chalk.cyan.bold(budy || m.mtype)) + "\n" + chalk.magenta("=> From"), chalk.green(pushname), chalk.yellow(m.sender) + "\n" + chalk.magenta("=> In"), chalk.green(m.isGroup ? groupName : groupName))
    } else {
      console.log(chalk.black(chalk.bgWhiteBright("[ MSG ]")), chalk.black(chalk.white.bold(budy || m.mtype)) + "\n" + chalk.magenta("=> From"), chalk.green(pushname), chalk.yellow(m.sender) + "\n" + chalk.magenta("=> In"), chalk.green(m.isGroup ? groupName : groupName))
    }
    const sendFileFromUrl = async (from, url, caption, msg, men) => {
      let mime = "";
      let res = await axios.head(url)
      mime = res.headers["content-type"]
      if (mime.split("/")[1] === "gif") {
        return client.sendMessage(m.chat, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : [] }, { quoted: m })
      }
      let type = mime.split("/")[0] + "Message"
      if (mime.split("/")[0] === "image") {
        return client.sendMessage(m.chat, { image: await getBuffer(url), caption: caption, mentions: men ? men : [] }, { quoted: m })
      } else if (mime.split("/")[0] === "video") {
        return client.sendMessage(m.chat, { video: await getBuffer(url), caption: caption, mentions: men ? men : [] }, { quoted: m })
      } else if (mime.split("/")[0] === "audio") {
        return client.sendMessage(m.chat, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: "audio/mpeg" }, { quoted: m })
      } else {
        l
        return client.sendMessage(m.chat, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : [] }, { quoted: m })
      }
    }
    switch (command) {
      case "menu": case "help": {
        m.reply("hellos?")
      }
        break;
      case "self": {
        if (!isCreator) return m.reply(mess.owner)
        if (!client.public) return m.reply(mess.now)
        client.public = false
        m.reply("sukses mengubah ke mode self!")
      }
        break
      case "public": {
        if (!isCreator) return m.reply(mess.owner)
        if (client.public) return m.reply(mess.now)
        client.public = true
        m.reply("sukses mengubah ke mode public!")
      }
        break
      case "translate": case "tl": {
        if (!text) return m.reply("Teksnya?\nContoh .translate what are you doing")
        res = await fetchJson(`https://docs-api-zahirrr.herokuapp.com/api/translate?text=${text}`)
        m.reply(`⚙️Translate : ${text}\n🔎Hasil : ${res.text}`)
      }
        break
      case "couple": {
        m.reply(mess.wait)
        let anu = await fetchJson("https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json")
        let random = anu[Math.floor(Math.random() * anu.length)]
        client.sendMessage(m.chat, { image: { url: random.male }, caption: `Couple Male` }, { quoted: m })
        client.sendMessage(m.chat, { image: { url: random.female }, caption: `Couple Female` }, { quoted: m })
      }
        break;
      case "runtime": {
        const formater = (seconds) => {
          const pad = (s) => {
            return (s < 10 ? "0" : "") + s
          }
          const hrs = Math.floor(seconds / (60 * 60))
          const mins = Math.floor(seconds % (60 * 60) / 60)
          const secs = Math.floor(seconds % 60)
          return " " + pad(hrs) + ":" + pad(mins) + ":" + pad(secs)
        }
        const uptime = process.uptime()
        await m.reply(`*── 「 BOT UPTIME 」 ──*\n\n❏${formater(uptime)}`)
      }
        break;
      case "group": case "grup": {
        if (!m.isGroup) throw mess.group
        if (!isBotAdmins) throw mess.botAdmin
        if (!isAdmins) throw mess.admin
        if (args[0] === "close") {
          await client.groupSettingUpdate(m.chat, "announcement").then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => m.reply(jsonformat(err)))
        } else if (args[0] === "open") {
          await client.groupSettingUpdate(m.chat, "not_announcement").then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => m.reply(jsonformat(err)))
        } else {
          let buttons = [{ buttonId: "group open", buttonText: { displayText: "Open" }, type: 1 }, { buttonId: "group close", buttonText: { displayText: "Close" }, type: 1 }]
          await client.sendButtonText(m.chat, buttons, `Mode Group`, client.user.name, m)
        }
      }
        break;
      case "sticker": case "s": case "stickergif": case "sgif": {
        if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command}`
        m.reply(mess.wait)
        if (/image/.test(mime)) {
          let media = await quoted.download()
          let encmedia = await client.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia)
        } else if (/video/.test(mime)) {
          if ((quoted.msg || quoted).seconds > 11) return m.reply("Maksimal 10 detik!")
          let media = await quoted.download()
          let encmedia = await client.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia)
        } else {
          throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
        }
      }
        break;
      default:
    }
  } catch (err) {
    console.log(color('[ERROR]', 'blue'), err)
  }
}