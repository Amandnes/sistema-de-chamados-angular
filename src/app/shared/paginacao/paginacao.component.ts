import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-paginacao',
    templateUrl: './paginacao.component.html',
    styleUrl: './paginacao.component.css'
})
export class PaginacaoComponent implements OnInit{
    items: any
    @Input() dados: any
    @Output() emitirDados: EventEmitter<any> = new EventEmitter<any>

    constructor() {
    }

    ngOnInit(): void {
        this.items = this.dados
        this.emitirDados.emit(this.paginatedItems)     
    }
    
    currentPage = 1
    itemsPerPage = 5

    get paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        return this.items.slice(startIndex, startIndex + this.itemsPerPage)
    }

    get totalPages(): number {
        return Math.ceil(this.items.length / this.itemsPerPage)
    }

    setPage(pageNumber: number) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.currentPage = pageNumber
        }
        this.emitirDados.emit(this.paginatedItems)
    }
}