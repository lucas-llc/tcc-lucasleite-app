import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {Configuration, OpenAIApi} from 'openai';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { environment } from 'src/environments/environment'

const config = new Configuration({
  apiKey: environment['OPENAI_API_KEY']
})

const openai = new OpenAIApi(config)

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  goal: any;
  answer: any;
  suggestions: any = [];
  constructor(
    public ss: SignatureService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.listSignatures();
  }

  listSignatures() {
    this.ss.list().subscribe({
      next: () => {
      },
      error: () => {
      }
    });
  }

  async getSuggestions() {
    const loading = await this.loadingController.create();
    await loading.present();
    let prompt = 'Tenho os seguintes serviços de assinatura:';

    for (const signature of this.ss.signatureList) {
      prompt += ' ' + signature.name + " - " + signature.price + " reais, ";
    }

    prompt += ' Quero gastar no máximo ' + this.goal + ' reais, quais combinações com o máximo de serviços eu posso fazer para manter essa meta de gasto?'
    // prompt += ' Inicie cada sugestão com um - e o número da sugestão.'
    prompt += ' Coloque um * no ínicio de cada combinação'

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048
    })

    this.answer = completion.data.choices[0].text?.trim();

    if (this.answer) {
      this.suggestions = this.answer.split('*');
      if (this.suggestions) {
        this.suggestions.shift();
      }
    }

    loading.dismiss();
  }

  async calculateCombinations() {
    const loading = await this.loadingController.create();
    await loading.present();

    let signaturePrices: { name: string, price: number }[] = [];
    for (const signature of this.ss.signatureList) {
      signaturePrices.push({name: signature.name, price: signature.price})
    }

    console.log(signaturePrices)

    this.suggestions = await this.combinacoesAbaixoDoTotal(signaturePrices, this.goal);

    console.log(this.suggestions)

    loading.dismiss();
  }

  combinacoesAbaixoDoTotal(valores: { name: string, price: number }[], total: number): { name: string, price: number }[][] {
    const resultado: {  name: string, price: number }[][] = [];

    function backtrack(inicio: number, soma: number, combinacao: {  name: string, price: number }[]): void {
      if (soma > total) {
        return;
      }

      if (soma <= total && inicio === valores.length) {
        resultado.push([...combinacao]);
        return;
      }

      for (let i = inicio; i < valores.length; i++) {
        combinacao.push(valores[i]);
        soma += valores[i].price;
        backtrack(i + 1, soma, combinacao);
        combinacao.pop();
        soma -= valores[i].price;
      }
    }

    backtrack(0, 0, []);
    return resultado;
  }

}
