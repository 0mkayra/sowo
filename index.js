//Buradaki Hiçbirşeye Dokunmayın Bot Bozulur.
//Kod Çalmak İçin Gelenlerede Hakım Helal Degil.
const { Client } = require("discord.js");
const bot = new Client();
const database = require("orio.db");
const pogger = require("pogger");
const chalk = require("chalk");
const {
  Token,
  Prefix,
  BotOwner,
  OwoBotID,
  UserID,
  GuildID,
  Yaz1,
  Yaz2,
  Yaz3,
  Yaz4,
  Yaz5,
  Yaz6,
  Yaz7,
  Yaz8,
  Yaz9,
  Yaz10,
  Yaz11,
  Yaz12,
  Yaz13,
  Yaz14,
  Yaz15,
  Yaz16,
} = require("./config");

bot.on("message", async (message) => {
  let guild = bot.guilds.get(GuildID);
  if (!guild) return;

  let captchaSystem = await database.get(`captchaSystem.${guild.id}`);
  let owoChannelData = await database.get(`owoChannel.${guild.id}`);
  let owner = bot.users.get(BotOwner);
  let owo = bot.users.get(OwoBotID);
  let kanal = bot.channels.get(owoChannelData);

  if (captchaSystem && captchaSystem === "open") {
    if (message.channel.type === "dm") {
      if (message.author.id == OwoBotID) {
        if (message.attachments.first()) {
          owner
            .send(
              `OwO Bot Tarafından Spam'a Düştün! <@${BotOwner}>\n\n**LÜTFEN RESİMDE GÖRDÜĞÜN KODU BURAYA YAZ!** \n\n${
                message.attachments.first()?.proxyURL || null
              }`
            )
            .then((x) => {
              const filter = (m) =>
                m.content.includes(message.content) &&
                m.author.id === message.author.id;

              const collector = x.channel.createMessageCollector(filter, {
                time: 10000,
                max: 1,
              });

              collector.on("collect", (m) => {
                owo.send(m.content).catch(() => {});
              });
            })
            .catch(() => {
              if (!kanal) return;

              kanal.send(`${owner} dm kapalı mı?`).catch(() => {});
            });
        }
      }
    }
  }
});

bot.on("message", async (message) => {
  if (message.author.bot || !message.content.toLowerCase().startsWith(Prefix))
    return;

  if (message.author.id !== BotOwner) return;

  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0].slice(Prefix.length);

  let data = await database.get(`owoSystem.${message.guild.id}`);
  let owoChannelData = await database.get(`owoChannel.${message.guild.id}`);
  let otoSell = await database.get(`otoSell.${message.guild.id}`);
  let captchaSystem = await database.get(`captchaSystem.${message.guild.id}`);
  let kanal = bot.channels.get(owoChannelData);
  let owo = bot.users.get(OwoBotID);

  if (command === "owo") {
message.delete().catch(() => {});
    if (!args[0])
      return message.channel
        .send(
          `Yanlış kullanım arguman belirtmen gerekiyor. \n\nDoğru Kullanımına yardım menüsünden bakabilirsin. **${Prefix}yardım**`
        )
        .then((x) => x.delete(5000).catch(() => {}))
        .catch(() => {});

    if (args[0] === "başlat") {
      if (data)
        return message.channel
          .send(`OwO sistemi zaten açık durumda?`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      if (!owoChannelData)
        return message.channel
          .send(
            `OwO sistemini başlatmak için OwO kanalı ayarlamalısın. \`${Prefix}owo owo-chat #kanal\``
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      await database.set(`owoSystem.${message.guild.id}`, "start");
      message.channel
        .send(`Başarıyla owo sistemi açıldı artık xp kasmaya başlıcağım.`)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});
    }

    if (args[0] === "durdur") {
      if (!data)
        return message.channel
          .send(`OwO sistemi zaten kapalı durumda?`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      await database.delete(`owoSystem.${message.guild.id}`);
      message.channel
        .send(`Başarıyla owo sistemi kapatıldı artık xp kasmayı bırakacağım.`)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});
    }

    if (args[0] === "durum") {
      message.channel
        .send(`OwO sistemi şuanda **${data ? `açık` : `kapalı`}** durumda.`)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});
    }

    if (args[0] === "owo-chat") {
      let kanal = message.mentions.channels.first() || bot.channels.get(args[1])

      if (args[1] === "sıfırla") {
        await database.delete(`owoChannel.${message.guild.id}`);
        message.channel
          .send(`OwO kanalı başarıyla **sıfırlandı**.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

        return;
      }

      if (!kanal)
        return message.channel
          .send(`OwO kanalını ayarlamak için kanal ID'si yazmalısın veya etiketlemelisin.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      if (owoChannelData)
        return message.channel
          .send(
            `OwO kanalı zaten ayarlı sıfırlayabilirsin \`${Prefix}owo owo-chat sıfırla\``
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      await database.set(`owoChannel.${message.guild.id}`, kanal.id);
      message.channel
        .send(`OwO kanalı başarıyla **ayarlandı**. Kanal: ${kanal}`)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});
    }

    if (args[0] === "para") {
      if (!kanal)
        return message.channel
          .send(
            `OwO kanalı ayarlı olmadığı için işlem yapamıyorum. \nYardım menüsünden nasıl ayarlandığına bakabilirsin.`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      kanal
        .send(`owo cash`)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});

      const filter = (m) =>
        m.content.includes(bot.user.username) && m.author.id === OwoBotID;

      const collector = kanal.createMessageCollector(filter, { time: 15000 });
      collector.on("collect", (m) =>
        message.channel
          .send(m.content)
          .then((x) => x.delete(5000).catch(() => {}))
          .catch(() => {})
      );
    }

    if (args[0] === "ö") {
      let mesaj = args.slice(1).join(" ");

      if (!mesaj)
        return message.channel
          .send("Bir mesaj yazmalısın.")
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      message.react("✅").catch(() => {});
      message.react("🍷").catch(() => {});

      message.channel
        .send(mesaj)
        .then(() => message.delete(3000).catch(() => {}))
        .catch(() => {});
    }

    if (args[0] === "!") {
      let mesaj = args.slice(1).join(" ");

      if (!mesaj)
        return message.channel
          .send("Bir mesaj yazmalısın.")
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      try {
        message.delete().catch(() => {});

        owo.send(mesaj);
      } catch (err) {
        message.channel
          .send(
            `OwO botu özelden bir mesaj göndermediği için mesaj gönderemezsiniz.`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});
      }
    }

    if (args[0] === "sat") {
      if (!kanal)
        return message.channel
          .send(
            `OwO kanalı ayarlı olmadığı için işlem yapamıyorum. \nYardım menüsünden nasıl ayarlandığına bakabilirsin.`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      message.delete().catch(() => {});
      kanal.send(`owo sell all`).catch(() => {});

      setTimeout(() => {
        kanal.send(`owo sell rareweapons`).catch(() => {});
      }, 5000);

      message.channel
        .send(`Başarıyla bütün **hayvanlar** ve **eşyalar** satıldı.`)
        .then((x) => x.delete(5000).catch(() => {}))
        .catch(() => {});
    }

    if (args[0] === "zoo") {
      if (!kanal)
        return message.channel
          .send(
            `OwO kanalı ayarlı olmadığı için işlem yapamıyorum. \nYardım menüsünden nasıl ayarlandığına bakabilirsin.`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      kanal
        .send(`owo zoo`)
        .then(() => message.delete().catch(() => {}))
        .catch(() => {});
    }

    if (args[0] === "inv") {
      if (!kanal)
        return message.channel
          .send(
            `OwO kanalı ayarlı olmadığı için işlem yapamıyorum. \nYardım menüsünden nasıl ayarlandığına bakabilirsin.`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      kanal
        .send(`owo inv`)
        .then(() => message.delete().catch(() => {}))
        .catch(() => {});
    }

    if (args[0] === "use") {
      let use = args.slice(1).join(" ");

      if (!use)
        return message.channel
          .send(
            `Bir item kullanmak için lütfen itemin kodunu veya sayısını yazabilir misin?`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          );

      message.channel.send(`owo use ${use}`).catch(() => {});
    }

    if (args[0] === "para-gönder") {
      let para = Number(args[1]);

      if (!kanal)
        return message.channel
          .send(
            `OwO kanalı ayarlı olmadığı için işlem yapamıyorum. \nYardım menüsünden nasıl ayarlandığına bakabilirsin.`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      if (!para)
        return message.channel
          .send(`Para göndermek için ne kadar göndericeğini yazmalısın.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      if (para < 0)
        return message.channel
          .send(`Pozitif bir sayı yazmalısın.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      kanal.send(`owo send <@!${BotOwner}> ${para}`);

      message.channel
        .send(
          `İşlem yapıldı ve eğer ki hesapta yazdığın kadar para varsa gönderme işlemi yapılmıştır.`
        )
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});
    }

    if (args[0] === "oto-sat") {
      if (!args[1])
        return message.channel
          .send(
            `Bir arguman yazman gerek. Doğru Kullanım: \`${Prefix}owo oto-sat (aç, kapat)\` yazabilirsin.`
          )
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      if (args[1] === "aç") {
        if (otoSell)
          return message.channel
            .send(`Bu sistem zaten açık durumda.`)
            .then(
              (x) => x.delete(5000).catch(() => {}),
              message.delete().catch(() => {})
            )
            .catch(() => {});

        await database.set(`otoSell.${message.guild.id}`, "open");
        message.channel
          .send(`Başarıyla oto satış sistemi açıldı.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});
      }

      if (args[1] === "kapat") {
        if (!otoSell)
          return message.channel
            .send(`Bu sistem zaten kapalı durumda.`)
            .then(
              (x) => x.delete(5000).catch(() => {}),
              message.delete().catch(() => {})
            )
            .catch(() => {});

        await database.delete(`otoSell.${message.guild.id}`);
        message.channel
          .send(`Başarıyla oto satış sistemi kapatıldı.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});
      }
    }
  }

  if (command === "captcha-sistem") {
    if (!args[0])
      return message.channel
        .send(`Sistemi açmak için \`${Prefix}captcha-sistem (aç, kapat)\``)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});

    if (args[0] === "aç") {
      if (captchaSystem)
        return message.channel
          .send(`Bu sistem zaten açık durumda.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      await database.set(`captchaSystem.${message.guild.id}`, "open");
      message.channel
        .send(`Başarıyla captcha sistemi açıldı.`)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});
    }

    if (args[0] === "kapat") {
      if (!captchaSystem)
        return message.channel
          .send(`Bu sistem zaten kapalı durumda.`)
          .then(
            (x) => x.delete(5000).catch(() => {}),
            message.delete().catch(() => {})
          )
          .catch(() => {});

      await database.delete(`captchaSystem.${message.guild.id}`);
      message.channel
        .send(`Başarıyla captcha sistemi kapatıldı.`)
        .then(
          (x) => x.delete(5000).catch(() => {}),
          message.delete().catch(() => {})
        )
        .catch(() => {});
    }
  }

  if (command === "ayarlar") {
    message.channel
      .send(
        `**BOT AYARLARI:** \n\nOwO Sistem: ${
          data ? `✅` : `❌`
        } \nCaptcha Sistem: ${captchaSystem ? `✅` : `❌`} \nOtomatik Satış: ${
          otoSell ? `✅` : `❌`
        } \nOwO Chat Kanal: ${
          owoChannelData ? `<#${owoChannelData}>` : `**Ayarlı değil**`
        }`
      )
      .then(
        (x) => x.delete(10000).catch(() => {}),
        message.delete().catch(() => {})
      )
      .catch(() => {});
  }

  if (command === "yardım") {
    message.channel
      .send(
        `**Yardım Menüsü:** \n\n\`${Prefix}owo başlat\` | OwO sistemini başlatabilirsin. \n\`${Prefix}owo durdur\` | OwO sistemini durdurabilirsin. \n\`${Prefix}owo durum\` | Sistemin açık veya kapalı olduğunu kontrol edebilirsin. \n\`${Prefix}owo owo-chat\` | OwO oynayacağı kanalı ayarlayabilirsin veya sıfırlayabilirsin. \n\`${Prefix}owo para\` | Hesabın ne kadar parası olduğunu kontrol edebilirsin. \n\`${Prefix}owo ö\` | Ayarladığını kanala özel mesaj gönderebilirsin. \n\`${Prefix}owo özel-mesaj\` | OwO botuna özel mesaj gönderebilirsin. \n\`${Prefix}owo sat\` | Eşyalarınızı ve hayvanlarınızı satabilrisin. \n\`${Prefix}owo zoo\` | Bütün hayvanlarını kontrol edebilirsin. \n\`${Prefix}owo inv\` | OwO envanterini kontrol edebilirsin. \n\`${Prefix}owo use\` | OwO envaterinde bulunan itemleri kullanabilirsin. \n\`${Prefix}owo para-gönder\` | Kendi hesabına para belirtiğiniz kadar para gönderebilirsin. \n\`${Prefix}owo oto-sat\` | OwO botunda bulunan hayvanları belirli süre sonra otomatik olarak satabilirsin. \n\nCaptcha sitemine göz atmak için \`${Prefix}captcha-sistem\` yazabilirsin.\n \n Code By Søneż`
      )
      .then(
        (x) => x.delete(10000).catch(() => {}),
        message.delete().catch(() => {})
      )
      .catch(() => {});
  }
});

bot.on("ready", async () => {
  let guild = bot.guilds.get(GuildID);
  if (!guild) return;

  setInterval(async () => {
    let data = await database.get(`owoSystem.${guild.id}`);
    let owoChannelData = await database.get(`owoChannel.${guild.id}`);
    let kanal = bot.channels.get(owoChannelData);

    let user = UserID[Math.floor(Math.random() * UserID.length)] || BotOwner
    let msg = [
      `${Yaz1}`,
      `${Yaz2}`,
      `${Yaz3}`,
      `${Yaz4}`,
      `${Yaz5} ${UserID}`,
      `${Yaz6}`,
      `${Yaz7}`,
      `${Yaz8}`,
      `${Yaz9}`,
      `${Yaz10}`,
      `${Yaz11}`,
      `${Yaz12}`,
      `${Yaz13}`,
      `${Yaz14}`,
      `${Yaz15}`,
      `${Yaz16}`,
    ];

    let random = msg[Math.floor(Math.random() * msg.length)];

    if (!kanal) return;

    if (data && data === "start") {
      kanal.send(random).catch(() => {});
    }
  }, 20000);

  setInterval(async () => {
    let otoSell = await database.get(`otoSell.${guild.id}`);
    let owoChannelData = await database.get(`owoChannel.${guild.id}`);
    let kanal = bot.channels.get(owoChannelData);

    if (!kanal) return;
    if (otoSell && otoSell === "open") {
      kanal.send(`owo sell all`).catch(() => {});

      setTimeout(() => {
        kanal.send(`owo sell rareweapons`).catch(() => {});
      }, 5000);
    }
  }, 200000);
});

bot
  .login(Token)
  .then(() => pogger.warning(chalk.green("[BAŞARILI] [OwO-BOT]  Başarılı Bir Şekilde Aktif Oldu! >>Yapım By Sonez<<")))
  .catch((err) =>
    pogger.info(
      chalk.red("[UYARI] Bot Aktif Degil. >>Lütfen Sonez'e Ulaş<< \nHata: " + err)
    )
  );
