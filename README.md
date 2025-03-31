# Connection-Smartphone
**Comunicação com smartphone Android via Termux API e Firebase API**

## Tecnologias Utilizadas
- **Firebase** e **Firebase API**
- **JavaScript**
- **Termux** e **Termux API**
- **Smartphone Android**

## Notas do simplesrodrigo
A ideia deste projeto é explorar a Internet das Coisas (IoT). No entanto, como não possuo um microcontrolador (como Arduino ou ESP32), nem sensores e outros componentes de hardware, pensei em aproveitar os sensores já presentes no meu smartphone.

Nas aulas de Banco de Dados do segundo semestre, estudamos Big Data. Minha apresentação focou no volume de dados gerados em poucos segundos pelos sensores de um smartphone (lembro de ter falado sobre o giroscópio, mas vou adicionar mais exemplos aqui). Isso me fez refletir: **por que não utilizar as tecnologias de IoT, como o Firebase e uma interface web, para se comunicar com os sensores do meu smartphone?**

A princípio, o projeto se concentrará em uma página web simples, onde você poderá controlar a vibração do seu smartphone (sim, um vibrador 😏).

## Instalação

### Termux
O **Termux** é um emulador de terminal gratuito e de código aberto para Android. Ele permite a execução de um ambiente Linux completo no seu dispositivo Android.

**Atenção:** **Não instale pela Play Store!** Utilize o F-Droid para instalar.

### F-Droid
O **F-Droid** é um repositório de aplicativos de código aberto para Android. Ele facilita a navegação, instalação e acompanhamento de atualizações de apps gratuitos e de código aberto.

#### Instalação do F-Droid e Termux
1. Baixe o **F-Droid** [aqui](https://f-droid.org/F-Droid.apk).
   
   > **Nota:** Para instalar um arquivo APK de uma fonte desconhecida, você precisa ativar a opção de **"Instalar de fontes desconhecidas"** nas configurações do Android. Caso não saiba como fazer isso, procure aprender, pois isso é o básico galera!

2. Após instalar o F-Droid, abra o app e procure por **Termux**. Instale tanto o **Termux** quanto a extensão **Termux API**.

### Primeiras Configurações
1. Abra o **Termux** e execute o comando para instalar a API do Termux:

    ```bash
    pkg install termux-api
    ```

2. Se você está se perguntando por que estamos instalando via linha de comando se já instalamos pelo F-Droid, a resposta é simples: **no meu caso, só funcionou instalando ambos**. Você pode testar de outras formas se preferir.

3. Após a instalação do `termux-api`, execute o seguinte comando para listar os sensores disponíveis no seu smartphone:

    ```bash
    termux-sensor -l
    ```

   > **Nota:** O parâmetro `-l` lista os sensores disponíveis no seu dispositivo, tu já manja de Linux né safadinho😏?

   Se tudo estiver configurado corretamente, você verá algo semelhante a:

    ```json
    {
      "sensors": [
        "ACCELEROMETER",
        "MAGNETOMETER",
        "ORIENTATION",
        "GYROSCOPE",
        "LIGHT",
        "PROXIMITY",
        "GRAVITY",
        "LINEARACCEL",
        "ROTATION_VECTOR",
        "UNCALI_MAG",
        "GAME_ROTATION_VECTOR",
        "UNCALI_GYRO",
        "SIGNIFICANT_MOTION",
        "STEP_DETECTOR",
        "STEP_COUNTER",
        "GEOMAGNETIC_ROTATION_VECTOR",
        "TILT_DETECTOR",
        "GLANCE_GESTURE",
        "pickup Wakeup",
        "DEVICE_ORIENTATION",
        "STATIONARY_DETECT",
        "MOTION_DETECT",
        "UNCALI_ACC",
        "SAR",
        "STEP_DETECTOR_WAKEUP"
      ]
    }
    ```

> Nota: Depois eu continuo a documentação princesas.
