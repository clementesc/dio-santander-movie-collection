import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina: number = 4;
  pagina: number = 0;

  filmes: Filme[] = [];

  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void { 
    this.listaFilmes();
  }

  onScroll(): void {
    this.listaFilmes();
  }

  private listaFilmes(): void{
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina).subscribe({
      next: filmes => this.filmes.push(...filmes),
      error: err => console.log('Error', err)
    });
  }

}
