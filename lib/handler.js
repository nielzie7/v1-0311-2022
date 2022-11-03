require("./config")
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
const { smsg, getGroupAdmins, formatp, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require("./lib/myfunc")

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

            switch (command) {

                  default:
            }
      } catch (err) {
            console.log(color('[ERROR]', 'blue'), err)
      }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
      fs.unwatchFile(file)
      console.log(chalk.redBright(`Update'${__filename}'`))
      delete require.cache[file]
      require(file)
})